using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.Common
{
    public class PropertyManager
    {
        /// <summary>
        /// Summary description for PropertyManager
        /// </summary>
        public PropertyManager()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public static string GetSystemConfig(string key, string defaultValue)
        {
            try
            {
                object setting = System.Configuration.ConfigurationManager.AppSettings[key];

                if (setting != null)
                {
                    if (setting.ToString().Equals(""))
                    {
                        setting = null;
                    }
                }

                return (setting == null) ? defaultValue : (string)setting;
            }
            catch
            {
            }

            return defaultValue;
        }
    }
}