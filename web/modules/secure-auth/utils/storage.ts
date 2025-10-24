export async function saveSerial(serial: string) {
  localStorage.setItem("wkt3_serial", serial);
}

export async function getSerial(): Promise<string | null> {
  return localStorage.getItem("wkt3_serial");
}
