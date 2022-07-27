#include <Servo.h>

Servo myservo;

int servo_position = 0;
const int servoPin = 9;

void setup()
{
  Serial.begin(9600);

  pinMode(LED_BUILTIN, OUTPUT);

  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  myservo.attach(servoPin);

  myservo.write(90); // center the servo
  Serial.println("Begin");
}

void loop()
{

  if (Serial.available() > 0)
  {
    String incomingString = Serial.readString();
    Serial.print(F("Received from Serial: "));
    Serial.println(incomingString);
    if (incomingString.startsWith("right"))
    {
      Serial.println(F("Go Right"));
      for (servo_position = 0; servo_position <= 180; servo_position++)
      {
        myservo.write(servo_position);
        delay(20);
      }
    }
    else if (incomingString.startsWith("left"))
    {
      Serial.println(F("Go to Left"));
      for (servo_position = 180; servo_position >= 0; servo_position--)
      {
        myservo.write(servo_position);
        delay(20);
      }
    }
  }
}
