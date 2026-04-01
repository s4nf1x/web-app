#!/usr/bin/env python3

import os, sys, re
from Matem_DSP111 import*
from flask import Flask, render_template, jsonify, json, request
app = Flask(__name__)

SITE_ROOT = os.path.realpath(os.path.dirname(__file__))


profile_url = os.path.join(SITE_ROOT, 'settings.ini')
def getProfileId():
    profile_data = json.load(open(profile_url))
    return profile_data["Profile"]

def compareAndPrintChanges(data, newData):

     deapFields = [
        "Cross.Hi-pass",
        "Cross.Low-pass",
        "Volume",
        "Phase",
        "Mute",
        "Delay",
        "Spdif",
        "EQ.eqHi",
        "EQ.eqMid",
        "EQ.eqLow",
        "EQ.eqMaster",
     ]
     crossKeys = ['FilterOrd', 'Hz',"Tip"]
     eqKeys = ['band', 'gain', 'q']
     for prefix in deapFields:
        compare(prefix,data, newData)

def compare(compareItemPrefix,data,newData):
     paramMap={
        "Volume.master" : "1",
        "Volume.leftHi" : "2",
        "Volume.leftLow" : "3",
        "Volume.leftMid" : "4",
        "Volume.leftSub" : "5",
        "Volume.rightHi" : "6",
        "Volume.rightLow" : "7",
        "Volume.rightMid" : "8",
        "Volume.rightSub" : "9",
        "Cross.Hi-pass.hi" : "10",
        "Cross.Hi-pass.low" : "11",
        "Cross.Hi-pass.mid" : "12",
        "Cross.Hi-pass.sub" : "13",
        "Cross.Low-pass.hi" : "14",
        "Cross.Low-pass.low" : "15",
        "Cross.Low-pass.mid" : "16",
        "Cross.Low-pass.sub" : "17",
        "Delay.leftHi": "18",
        "Delay.leftLow": "19",
        "Delay.leftLow_F": "20",
        "Delay.leftMid": "21",
        "Delay.leftMid_F": "22",
        "Delay.leftSub": "23",
        "Delay.leftSub_F": "24",
        "Delay.leftTHi_F": "25",
        "Delay.rightHi": "26",
        "Delay.rightHi_F": "27",
        "Delay.rightLow": "28",
        "Delay.rightLow_F": "29",
        "Delay.rightMid": "30",
        "Delay.rightMid_F": "31",
        "Delay.rightSub": "32",
        "Delay.rightSub_F": "33",
        "EQ.eqHi.1" : "34",
        "EQ.eqHi.2" : "35",
        "EQ.eqHi.3" : "36",
        "EQ.eqHi.4" : "37",
        "EQ.eqHi.5" : "38",
        "EQ.eqHi.6" : "39",
        "EQ.eqHi.7" : "40",
        "EQ.eqHi.8" : "41",
        "EQ.eqHi.9" : "42",
        "EQ.eqHi.10" : "43",
        "EQ.eqLow.1" : "44",
        "EQ.eqLow.2" : "45",
        "EQ.eqLow.3" : "46",
        "EQ.eqLow.4" : "47",
        "EQ.eqLow.5" : "48",
        "EQ.eqLow.6" : "49",
        "EQ.eqLow.7" : "50",
        "EQ.eqLow.8" : "51",
        "EQ.eqLow.9" : "52",
        "EQ.eqLow.10" : "53",
        "EQ.eqMaster.1" : "54",
        "EQ.eqMaster.2" : "55",
        "EQ.eqMaster.3" : "56",
        "EQ.eqMaster.4" : "57",
        "EQ.eqMaster.5" : "58",
        "EQ.eqMaster.6" : "59",
        "EQ.eqMaster.7" : "60",
        "EQ.eqMaster.8" : "61",
        "EQ.eqMaster.9" : "62",
        "EQ.eqMaster.10" : "63",
        "EQ.eqMid.1" : "64",
        "EQ.eqMid.2" : "65",
        "EQ.eqMid.3" : "66",
        "EQ.eqMid.4" : "67",
        "EQ.eqMid.5" : "68",
        "EQ.eqMid.6" : "69",
        "EQ.eqMid.7" : "70",
        "EQ.eqMid.8" : "71",
        "EQ.eqMid.9" : "72",
        "EQ.eqMid.10" : "73",
        "Mute.leftHi": "74",
        "Mute.leftLow": "75",
        "Mute.leftMid": "76",
        "Mute.leftSub": "77",
        "Mute.master": "78",
        "Mute.rightHi": "79",
        "Mute.rightLow": "80",
        "Mute.rightMid": "81",
        "Mute.rightSub": "82",
       # "Mute.master" : "91",
        "Phase.leftHi" : "83",
        "Phase.leftLow" : "84",
        "Phase.leftMid" : "85",
        "Phase.leftSub" : "86",
        "Phase.rightHi" : "87",
        "Phase.rightLow" : "88",
        "Phase.rightMid" : "89",
        "Phase.rightSub" : "90",
        "Spdif.sinegenerator": "91",
        "Spdif.sinegeneratoract": "92",
        "Spdif.spdifin": "93",
        "Spdif.spdifinact": "94",
        "Spdif.spdifout": "95",
        "Spdif.spdifoutact": "96",
        "Spdif.whitenoise": "97",
        "Profile": "98"
     }
     deapFields = compareItemPrefix.split('.')
     compareItem = data
     compareItemNew = newData
     for key in deapFields:
         compareItem = compareItem[key]
         compareItemNew = compareItemNew[key]
     compareItemKeys = list(compareItem.keys())
     for key in compareItemKeys:
         if compareItem[key] != compareItemNew[key]:
            result = ''
            if(compareItemPrefix.split('.')[0] == "EQ") :
                number = re.sub("[a-z]", "", key)
                result = paramMap[compareItemPrefix+'.'+ number] + ":" + str(compareItemNew["band"+number])+":" + str(compareItemNew["gain"+number])+":" + str(compareItemNew["q"+number])
                #print(result)
            elif(compareItemPrefix.split('.')[0] == "Cross"):
                level = "hi"
                if("hi" in key):
                    level = "hi"
                if("low" in key):
                    level = "low"
                if("mid" in key):
                    level = "mid"
                if("sub" in key):
                    level = "sub"
                result = paramMap[compareItemPrefix+'.'+ level] +":" + str(compareItemNew[level+"FilterOrd"])+":" + str(compareItemNew[level+"Hz"])+":" + str(compareItemNew[level +"Tip"])
            else:
                result = paramMap[compareItemPrefix+'.'+ key] + ":" + str(compareItemNew[key])
            sendDataToDevice(result)


def sendDataToDevice(result):
    print(result)
    with open('adress.ini', 'r') as file:
        #json.dump(data, file, indent=4)
        Add = json.load(file)
    #print(Add['cros']['tw_hi'])
    ##..... Разделение принимаемой строки.....##
    data_in = result.split(':')
    #print(data_in)
    key = int(data_in[0])
        ##.... обработка громкости....##
    if key == 98: #   мастер громкость
        Init(int(data_in[1]))
        pass
    elif key == 1: #   мастер громкость
        volume(float(data_in[1]),0)
        pass
    elif key == 2: #  левый твит 
        rg_wr (210 + (int(data_in[1]) * 2), Add['Vol']['twl'])
        pass
    elif key == 3: #   левый мид
        rg_wr (210 + (int(data_in[1]) * 2), Add['Vol']['midl'])
        pass
    elif key == 4: # левый мид-басс
        rg_wr (210 + (int(data_in[1]) * 2), Add['Vol']['mrengl'])
        pass
    elif key ==  5: #   левый саб
        rg_wr (210 + (int(data_in[1]) * 2), Add['Vol']['subl'])
        pass
    elif key ==  6: #   правый твит
        rg_wr (210 + (int(data_in[1]) * 2), Add['Vol']['twr'])
        pass
    elif key ==  7: #   правый мид
        rg_wr (210 + (int(data_in[1]) * 2), Add['Vol']['midr'])
        pass
    elif key == 8: #   правый мид-басс
        rg_wr (210 + (int(data_in[1]) * 2), Add['Vol']['mrengr'])
        pass
    elif key == 9: #   правый саб
        rg_wr (210 + (int(data_in[1]) * 2), Add['Vol']['subr'])
        pass
    elif key ==  10: #  кросс LOW-твитт
        cross_lp(float(data_in[2]), float(data_in[3]), int(data_in[1]),[Add['cros']['tw_lo']['block1'],Add['cros']['tw_lo']['block2'],Add['cros']['tw_lo']['block3'],Add['cros']['tw_lo']['block4']])
        pass
    elif key ==  11: #  кросс LOW-mid
        cross_lp(float(data_in[2]), float(data_in[3]), int(data_in[1]),[Add['cros']['mid_lo']['block1'],Add['cros']['mid_lo']['block2'],Add['cros']['mid_lo']['block3'],Add['cros']['mid_lo']['block4']])
        pass
    elif key ==  12: #  кросс LOW-midr
        cross_lp(float(data_in[2]), float(data_in[3]), int(data_in[1]),[Add['cros']['reng_lo']['block1'],Add['cros']['reng_lo']['block2'],Add['cros']['reng_lo']['block3'],Add['cros']['reng_lo']['block4']])
        pass
    elif key ==  13: #  кросс LOW-sub
        cross_lp(float(data_in[2]), float(data_in[3]), int(data_in[1]),[Add['cros']['sub_lo']['block1'],Add['cros']['sub_lo']['block2'],Add['cros']['sub_lo']['block3'],Add['cros']['sub_lo']['block4']])
        pass
    elif key ==  14: #  кросс Hi-твитт
        cross_hp(float(data_in[2]), float(data_in[3]), int(data_in[1]),[Add['cros']['tw_hi']['block1'],Add['cros']['tw_hi']['block2'],Add['cros']['tw_hi']['block3'],Add['cros']['tw_hi']['block4']])
        pass
    elif key ==  15: #  кросс Hi-mid
        cross_hp(float(data_in[2]), float(data_in[3]), int(data_in[1]),[Add['cros']['mid_hi']['block1'],Add['cros']['mid_hi']['block2'],Add['cros']['mid_hi']['block3'],Add['cros']['mid_hi']['block4']])
        pass
    elif key ==  16: #  кросс Hi-midr
        cross_hp(float(data_in[2]), float(data_in[3]), int(data_in[1]),[Add['cros']['reng_hi']['block1'],Add['cros']['reng_hi']['block2'],Add['cros']['reng_hi']['block3'],Add['cros']['reng_hi']['block4']])
        pass
    elif key ==  17: #  кросс Hi-sub
        cross_hp(float(data_in[2]), float(data_in[3]), int(data_in[1]),[Add['cros']['sub_hi']['block1'],Add['cros']['sub_hi']['block2'],Add['cros']['sub_hi']['block3'],Add['cros']['sub_hi']['block4']])
        pass
    elif key == 18: # Delay Hi-left
        Wr (Add['Del']['twl'], int(float(data_in[1]) * 96.0))
        pass
    elif key == 19: # Delay Mid-left
        Wr (Add['Del']['midl'], int(float(data_in[1]) * 96.0))
        pass
    elif key == 21: # Delay Midr-left
        Wr (Add['Del']['mrengl'], int(float(data_in[1]) * 96.0))
        pass
    elif key == 23: # Delay Sub-left
        Wr (Add['Del']['subl'], int(float(data_in[1]) * 96.0))
        pass
    elif key == 26: # Delay Hi-right
        Wr (Add['Del']['twr'], int(float(data_in[1]) * 96.0))
        pass
    elif key == 28: # Delay Mid-right
        Wr (Add['Del']['midr'], int(float(data_in[1]) * 96.0))
        pass
    elif key == 30: # Delay Midr-right
        Wr (Add['Del']['mrengr'], int(float(data_in[1]) * 96.0))
        pass
    elif key == 32: # Delay Sub-right
        Wr (Add['Del']['subr'], int(float(data_in[1]) * 96.0))
        pass
    elif key ==  34: #  EQ Hi-1
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['tw']['block1'])
        #EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), 24738)
        pass
    elif key ==  35: #  EQ Hi-2
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['tw']['block2'])
        pass
    elif key ==  36: #  EQ Hi-3
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['tw']['block3'])
        pass
    elif key ==  37: #  EQ Hi-4
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['tw']['block4'])
        pass
    elif key ==  38: #  EQ Hi-5
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['tw']['block5'])
        pass
    elif key ==  39: #  EQ Hi-6
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['tw']['block6'])
        pass
    elif key ==  40: #  EQ Hi-7
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['tw']['block7'])
        pass
    elif key ==  41: #  EQ Hi-8
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['tw']['block8'])
        pass
    elif key ==  42: #  EQ Hi-9
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['tw']['block9'])
        pass
    elif key ==  43: #  EQ Hi-10
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['tw']['block10'])
        pass
    elif key ==  44: #  EQ Mid-1
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['mid']['block1'])
        pass
    elif key ==  45: #  EQ Mid-2
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['mid']['block2'])
        pass
    elif key ==  46: #  EQ Mid-3
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['mid']['block3'])
        pass
    elif key ==  47: #  EQ Mid-4
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['mid']['block4'])
        pass
    elif key ==  48: #  EQ Mid-5
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['mid']['block5'])
        pass
    elif key ==  49: #  EQ Mid-6
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['mid']['block6'])
        pass
    elif key ==  50: #  EQ Mid-7
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['mid']['block7'])
        pass
    elif key ==  51: #  EQ Mid-8
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['mid']['block8'])
        pass
    elif key ==  52: #  EQ Mid-9
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['mid']['block9'])
        pass
    elif key ==  53: #  EQ Mid-10
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['mid']['block10'])
        pass
    elif key ==  54: #  EQ Sub-1
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['sub']['block1'])
        pass
    elif key ==  55: #  EQ Sub-2
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['sub']['block2'])
        pass
    elif key ==  56: #  EQ Sub-3
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['sub']['block3'])
        pass
    elif key ==  57: #  EQ Sub-4
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['sub']['block4'])
        pass
    elif key ==  58: #  EQ Sub-5
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['sub']['block5'])
        pass
    elif key ==  59: #  EQ Sub-6
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['sub']['block6'])
        pass
    elif key ==  60: #  EQ Sub-7
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['sub']['block7'])
        pass
    elif key ==  61: #  EQ Sub-8
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['sub']['block8'])
        pass
    elif key ==  62: #  EQ Sub-9
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['sub']['block9'])
        pass
    elif key ==  63: #  EQ Sub-10
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['sub']['block10'])
        pass
    elif key ==  64: #  EQ Midr-1
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['reng']['block1'])
        pass
    elif key ==  65: #  EQ Midr-2
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['reng']['block2'])
        pass
    elif key ==  66: #  EQ Midr-3
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['reng']['block3'])
        pass
    elif key ==  67: #  EQ Midr-4
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['reng']['block4'])
        pass
    elif key ==  68: #  EQ Midr-5
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['reng']['block5'])
        pass
    elif key ==  69: #  EQ Midr-6
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['reng']['block6'])
        pass
    elif key ==  70: #  EQ Midr-7
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['reng']['block7'])
        pass
    elif key ==  71: #  EQ Midr-8
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['reng']['block8'])
        pass
    elif key ==  72: #  EQ Midr-9
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['reng']['block9'])
        pass
    elif key ==  73: #  EQ Midr-10
        EQ(float(data_in[1]), float(data_in[2]), float(data_in[3]), Add['EQ']['reng']['block10'])
        pass
    elif key ==  74: # Mute Hi-left
        Wr (Add['Mute']['twl'], int(data_in[1]))
        pass
    elif key ==  75: # Mute Mid-left
        Wr (Add['Mute']['midl'], int(data_in[1]))
        pass
    elif key ==  76: # Mute Midr-left
        Wr (Add['Mute']['rengl'], int(data_in[1]))
        pass
    elif key ==  77: # Mute Sub-left
        Wr (Add['Mute']['subl'], int(data_in[1]))
        pass
    elif key ==  79: # Mute Hi-right
        Wr (Add['Mute']['twr'], int(data_in[1]))
        pass
    elif key ==  80: # Mute Mid-right
        Wr (Add['Mute']['midr'], int(data_in[1]))
        pass
    elif key ==  81: # Mute Midr-right
        Wr (Add['Mute']['rengr'], int(data_in[1]))
        pass
    elif key ==  82: # Mute Sub-right
        Wr (Add['Mute']['subr'], int(data_in[1]))
        pass
    elif key ==  83: # REV HI-left
        Wr (Add['Rev']['twl'], int(data_in[1]))
        pass
    elif key ==  84: # REV mid-left
        Wr (Add['Rev']['midl'], int(data_in[1]))
        pass
    elif key ==  85: # REV reng-left
        Wr (Add['Rev']['mrengl'], int(data_in[1]))
        pass
    elif key ==  86: # REV sub-left
        Wr (Add['Rev']['subl'], int(data_in[1]))
        pass
    elif key ==  87: #REV HI-right
        Wr (Add['Rev']['twr'], int(data_in[1]))
        pass
    elif key ==  88: # REV mid-right
        Wr (Add['Rev']['midr'], int(data_in[1]))
        pass
    elif key ==  89: # REV reng-right
        Wr (Add['Rev']['mrengr'], int(data_in[1]))
        pass
    elif key ==  90: # REV sub-right
        Wr (Add['Rev']['subr'], int(data_in[1]))
        pass


@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route("/getData")
def getData():
    id = getProfileId()
    file_url = os.path.join(SITE_ROOT, 'settings'+id+'.ini')
    data = json.load(open(file_url))
    return jsonify(data)

@app.route("/updateData", methods=['POST'])
def updateData():
    rec = request.get_json()
    id = getProfileId()
    file_url = os.path.join(SITE_ROOT, 'settings'+id+'.ini')
    data = json.load(open(file_url))
    with open(file_url, 'w') as f:
            json.dump(rec, f,indent=4)
    compareAndPrintChanges(data, rec)
    return jsonify(rec)

@app.route("/getProfile")
def getProfile():
    id = getProfileId()
    profile_url = os.path.join(SITE_ROOT, 'settings.ini')
    data = json.load(open(profile_url))
    return id

@app.route("/updateProfile", methods=['POST'])
def updateProfile():
    rec = request.get_json()
    result = "98" + ":" + rec["Profile"]
    sendDataToDevice(result)
    profile_url = os.path.join(SITE_ROOT, 'settings.ini')
    data = json.load(open(profile_url))
    with open(profile_url, 'w') as f:
            json.dump(rec, f,indent=4)
    return jsonify(rec)
    
@app.route("/sendCommand", methods=['POST'])
def sendCommand():
    rec = request.get_json()
    commandCode = rec["code"]
#    commandCode = int(rec["code"])

    if commandCode == '0':
        #print(commandCode)
        #print("ZERO")
        os.system('sudo systemctl restart initdsp')
    elif commandCode == '1':
        print(commandCode)
        os.system('sudo python3 /programs/web/adau.py')
        #print("ONE")
    elif commandCode == '2':
        os.system('sudo ./programs/web/pbackup.sh')
        #print(commandCode)
        #print("TWO")
    elif commandCode == '3':
        os.system('sudo ./programs/web/prestore.sh')
        #print(commandCode)
        #print("TWO")
        os.system('sudo reboot now')
    elif commandCode == '4':
        #print(commandCode)
        #print("TWO")
        os.system('sudo shutdown now')

    else:
        print(commandCode)
        #print("PRINT")
        print(type(commandCode))
    return commandCode

@app.route("/resetProfile", methods=['POST'])
def resetProfile():
    rec = request.get_json()
    resetProfileId =rec["id"]
    default_file_url = os.path.join(SITE_ROOT, 'default.ini')
    file_url = os.path.join(SITE_ROOT, 'settings'+resetProfileId+'.ini')
    default_data = json.load(open(default_file_url))
    with open(file_url, 'w') as f:
         json.dump(default_data, f,indent=4)
    print(resetProfileId)
    return resetProfileId



if __name__ == '__main__':
#    app.run(host="10.42.0.1", port=5000, debug=False)
    #app.run(host="192.168.1.27", port=5000, debug=False)
     app.run(host="localhost", port=80, debug=False)

