from fastapi import FastAPI, WebSocket
import time

app = FastAPI()

positions = {
    "mycar": [
        [43.301239, -2.022879],
        [43.30122335514245, -2.022642968085827],
        [43.3012545871238, -2.022299645372105],
        [43.30143417070528, -2.0219992379975977],
        [43.301527866276366, -2.0215593557706413],
        [43.301348282971624, -2.021280406065742],
        [43.30142636273452, -2.0208941680128043],
        [43.30114527511885, -2.020475743455455],
        [43.300981306742884, -2.0202289802549678],
        [43.30081343389983, -2.0199017507934505],
        [43.30076268155372, -2.019638894340757],
        [43.30080952987471, -2.0191614611919873],
        [43.30094226658821, -2.018761812095545],
        [43.301004730823664, -2.01852309552116],
        [43.301078907019935, -2.0182253703553545],
        [43.301174555139454, -2.0178981408938377],
        [43.301274107104014, -2.0175548181801153],
        [43.301336570998565, -2.017345605901441],
        [43.30138341887735, -2.0171417580401685],
        [43.30142245874875, -2.0169057236744847],
        [43.30136389893986, -2.016734061937134],
        [43.30135609096007, -2.016629455797797],
        [43.30141074679761, -2.0165194852410573],
        [43.30145173864351, -2.0162137134491487]
    ]
}

@app.websocket("/wsmap")
async def websocket_endpoint(websocket : WebSocket):
    print("Accepting connection")
    await websocket.accept()
    print("Accepted")
    while True:
        try:
            car_id = await websocket.receive_text()
            print(car_id)
            current_car_data = positions.get(car_id)
            if current_car_data is not None:
                for item in current_car_data:
                    await websocket.send_json(item)
                    print(item)
                    time.sleep(1)
        except:
            pass
            break
