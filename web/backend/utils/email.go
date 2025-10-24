package utils

import (
  "net/smtp"
  "fmt"
)

func SendEmail(to string, otp string) error {
  from := "jobhikarquiz@gmail.com"
  password :="kimd mhgo aeom dykf"

  smtpHost := "smtp.gmail.com"
  smtpPort := "587"

  msg := []byte(fmt.Sprintf("Subject: Your OTP\n\nYour OTP is: %s", otp))

  auth := smtp.PlainAuth("", from, password, smtpHost)
  return smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{to}, msg)
}