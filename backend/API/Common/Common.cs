using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace API.Common
{
    public class Common
    {
        public Common()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public static bool IsNull(string input)
        {
            if (input == null || input.Trim().Equals(""))
            {
                return true;
            }

            return false;
        }

        public static bool IsNull(DateTime input)
        {
            if (input == new DateTime(0))
            {
                return true;
            }

            return false;
        }

        public static bool IsNull(object input)
        {
            if (input == null || input.ToString().Trim().Equals("") || input == DBNull.Value)
            {
                return true;
            }

            return false;
        }

        public static string GetClientIp()
        {

            string hostIp = "";



            hostIp = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

            if (hostIp != null && hostIp != String.Empty)
            {

                //可能有代理

                if (hostIp.IndexOf(".") == -1)     //沒 有“.”肯定是非IPv4格式

                    hostIp = "127.0.0.1";

                else
                {

                    if (hostIp.IndexOf(",") != -1)
                    {

                        //有“,”，估計多個代理。取第一個不是內網的IP。

                        hostIp = hostIp.Replace(" ", "").Replace("\"", "");

                        string[] temparyip = hostIp.Split(",".ToCharArray());

                        for (int i = 0; i < temparyip.Length; i++)
                        {

                            if (IsIPAddress(temparyip[i])

                                  && temparyip[i].Substring(0, 3) != "10."

                                  && temparyip[i].Substring(0, 7) != "192.168"

                                  && temparyip[i].Substring(0, 7) != "172.16.")
                            {

                                return temparyip[i];     //找到不是內網的地址

                            }

                        }

                    }

                    else if (IsIPAddress(hostIp)) //代理即是IP格式

                        return hostIp;

                    else

                        hostIp = "127.0.0.1";     //代理中的內容 非IP，取IP

                }



            }



            string IpAddress = (HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] != null && HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] != String.Empty) ? HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] : HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];



            if (null == hostIp || hostIp == String.Empty)

                hostIp = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];



            if (hostIp == null || hostIp == String.Empty)
            {

                hostIp = HttpContext.Current.Request.UserHostAddress;

                if ((hostIp.Trim()).Length > 23)     // IPv6 format
                {

                    hostIp = hostIp.Substring(0, 22);

                }

            }



            if (hostIp.Equals("::1"))

                hostIp = "127.0.0.1";

            //hostIp = "217.146.186.51";

            return hostIp;

        }

        public static bool IsIPAddress(string str1)
        {
            if (str1 == null || str1 == string.Empty || str1.Length < 7 || str1.Length > 15) return false;
            string regformat = @"^\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3}$";
            Regex regex = new Regex(regformat, RegexOptions.IgnoreCase);
            return regex.IsMatch(str1);
        }

        public static string ReplaceError(string message)
        {
            return message.Replace("System.Data.SqlClient.SqlError: ", "");
        }
        
    }
}