from fastapi import FastAPI
import uvicorn
app = FastAPI()


@app.post("/payments/")
def create_payment():
    return {"successful payment"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3000)

