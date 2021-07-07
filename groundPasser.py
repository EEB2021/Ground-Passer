# importing libraries
import RPi.GPIO as GPIO
import time
import random
from gpiozero import Button, Buzzer, LED, DigitalInputDevice
from gpiozero.pins.pigpio import PiGPIOFactory
#imports and definitions for AWS connection
import paho.mqtt.client as paho
import os
import socket
import ssl
import string
import json
from time import sleep
from random import uniform

#initiate the two PiGPIO factory to remotly communicate with the other two devices
factory152 = PiGPIOFactory(host='192.168.153.152')
factory172 = PiGPIOFactory(host='192.168.153.172')

#initiate Button, Buzzer, vibration sensor (Input Device) and LEDs on main device
vibr = DigitalInputDevice (9)
button = Button (2)
bz = Buzzer(16)
ledGreen = LED (17)
ledRed= LED (18)
ledYellow = LED (19)
ledOutL = LED (12)
ledOutR = LED (21)

#initiate LEDs and vibration sensor (Input Device) on device with ip address '192.168.153.152'
vibr152 = DigitalInputDevice(9, pin_factory=factory152)
ledGreen152 = LED (17, pin_factory=factory152)
ledRed152= LED (18, pin_factory=factory152)
ledYellow152 = LED (19, pin_factory=factory152)
ledOutL152 = LED (20, pin_factory=factory152)
ledOutR152 = LED (21, pin_factory=factory152)

#initiate LEDs and vibration sensor (Input Device) on device with ip address '192.168.153.172'
vibr172 = DigitalInputDevice(9, pin_factory=factory172)
ledGreen172 = LED (17, pin_factory=factory172)
ledRed172= LED (18, pin_factory=factory172)
ledYellow172 = LED (19, pin_factory=factory172)
ledOutL172 = LED (20, pin_factory=factory172)
ledOutR172 = LED (21, pin_factory=factory172)

#initiate nrHits to count number of scored "goals" per round
global nrHits
nrHits =0

#iniate randInt to randomly assign the next "goal"
global randInt
randInt = 3

#define fucntions to turn on all Leds for all three devices
def allLedOn():
    ledGreen.on() 
    ledRed.on()
    ledYellow.on()
    ledOutL.on()
    ledOutR.on()
    
def allLedOn152():
    ledGreen152.on()
    ledRed152.on()
    ledYellow152.on()
    ledOutL152.on()
    ledOutR152.on()
    
def allLedOn172():
    ledGreen172.on()
    ledRed172.on()
    ledYellow172.on()
    ledOutL172.on()
    ledOutR172.on()

#define fucntions to turn off all Leds for all three devices
def allLedOff():
    ledGreen.off()
    ledRed.off()
    ledYellow.off()
    ledOutL.off()
    ledOutR.off()
    
def allLedOff152():
    ledGreen152.off()
    ledRed152.off()
    ledYellow152.off()
    ledOutL152.off()
    ledOutR152.off()
    
def allLedOff172():
    ledGreen172.off()
    ledRed172.off()
    ledYellow172.off()
    ledOutL172.off()
    ledOutR172.off()

#define functions if this device/goal is selected to be scored against next
#first turn the LEDs of this goal on and the LEDs from all other goals off then wait until the vibration sensor is triggered
def trigger152():
    allLedOn152()
    allLedOff()
    allLedOff172()
    time.sleep(0.5)
    vibr152.wait_for_active()
def trigger172():
    allLedOn172()
    allLedOff()
    allLedOff152()
    time.sleep(0.5)
    vibr172.wait_for_active()
def triggerThis():
    allLedOn()
    allLedOff172()
    allLedOff152()
    time.sleep(0.5)
    vibr.wait_for_active()
#define starting procedure: race beeping with animation of the lights. First the outer lights of all three device, then the inner ones   
def startingProcedure():
    time.sleep(2)
    bz.on()
    ledOutL.on()
    ledOutR.on()
    ledOutL152.on()
    ledOutR152.on()
    ledOutL172.on()
    ledOutR172.on()
    time.sleep(0.3)
    bz.off()
    allLedOff()
    allLedOff152()
    allLedOff172()
    time.sleep(0.8)
    bz.on()
    ledGreen.on()
    ledRed.on()
    ledYellow.on()
    ledGreen152.on()
    ledRed152.on()
    ledYellow152.on()
    ledGreen172.on()
    ledRed172.on()
    ledYellow172.on()
    time.sleep(0.3)
    bz.off()
    allLedOff()
    allLedOff152()
    allLedOff172()
    time.sleep(0.8)
    bz.on()
    time.sleep(1)
    bz.off()

#set up to communicate with the AWS cloud
connflag = False

#function for connection
def on_connect(client, userdata, flags, rc):              
    global connflag
    print ("Connected to AWS")
    connflag = True
    print("Connection returned result: " + str(rc) )

#function for Sending a message
def on_message(client, userdata, msg):                
    print(msg.topic+" "+str(msg.payload))
 
mqttc = paho.Client()                                       #mqttc object
mqttc.on_connect = on_connect                               #assign on_connect func
mqttc.on_message = on_message                               #assign on_message func

#aws specific parameters 
awshost = "a2pwwwetod6x1q-ats.iot.eu-central-1.amazonaws.com"    #endpoint
awsport = 8883                                                   #port no.   
clientId = "PiJulian_client"                                     #Thing_Name
thingName = "PiJulian_client"                                    #Thing_Name
caPath = "/home/pi/Downloads/AmazonRootCA1.pem"                                    #Root_CA_Certificate_Name
certPath = "/home/pi/Downloads/a86aad4404-certificate.pem.crt"                     #<Thing_Name>.cert.pem
keyPath = "/home/pi/Downloads/a86aad4404-private.pem.key"                          #<Thing_Name>.private.key
 
mqttc.tls_set(caPath, certfile=certPath, keyfile=keyPath, cert_reqs=ssl.CERT_REQUIRED, tls_version=ssl.PROTOCOL_TLSv1_2, ciphers=None)  #pass parameters
 
mqttc.connect(awshost, awsport, keepalive=60)               #connect to aws server
 
mqttc.loop_start()                                          #start the loop
 

while True:
    #start game when button is pressed
    button.wait_for_press()
    print("The button was pressed!")
    startingProcedure()
    #start meassuring time
    t0 = time.time()
    #loop ten times = 10 "goals" have to be scored
    while nrHits <= 10: 
        #generate a random number between 1 and 3
        randInt= random.randint(1,3)
        #trigger one device dependend on the generated randomInteger
        if randInt == 1:
            trigger152()
        elif randInt==2:
            triggerThis()
        else:
            trigger172()
        #when vibration module on the triggered device was hit, add on to nrHits and restart the loop  
        nrHits = nrHits +1
    t1 = time.time()
    #calculate needed time to score ten goals
    total = t1-t0
    # turn all LEDs off
    allLedOff()
    allLedOff152()
    allLedOff172()
    print(total)
    #reset nrHits
    nrHits=0
    #sending a json message to AWS cloud with user ("Jonas") and the time of this trial
    if connflag == True:
        random_string= "Jonas"
        paylodmsg0="{"
        paylodmsg1 = "\"id\": \""
        paylodmsg2 = "\"name\":\""
        paylodmsg3 = "\", \"zeit\": \""
        paylodmsg4="\"}"
        paylodmsg = "{} {} {} {} {} {}".format(paylodmsg0, paylodmsg2, random_string, paylodmsg3, total, paylodmsg4)
        paylodmsg = json.dumps(paylodmsg) 
        paylodmsg_json = json.loads(paylodmsg)       
        mqttc.publish("ElectronicsInnovation", paylodmsg_json , qos=1)        # topic: temperature # Publishing Temperature values
        print("msg sent: ElectronicsInnovation" ) # Print sent temperature msg on console
        print(paylodmsg_json)

    else:
        print("waiting for connection...")
    #make sound to tell the user the trial is over
    bz.on()
    time.sleep(1)
    bz.off()
