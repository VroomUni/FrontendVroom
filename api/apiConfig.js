// run this cmd to determine your ip adress
//Get-NetIPAddress | Where-Object {$_.AddressFamily -eq "IPv4" -and $_.PrefixOrigin -eq "Dhcp"} | Select-Object IPAddress
import { LOCALHOST } from "@env";
const apiConfig = {
  baseURL: `http://${LOCALHOST}:8080/api`, // Your API base URL

  // Include other configuration options as needed, such as:
  // headers: {
  //   'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
  //   'Content-Type': 'application/json',
  // },
  // timeout: 10000, // Request timeout in milliseconds
};

export default apiConfig;
