using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml;
using System.Xml.Serialization;

namespace CRM
{
    public class CommonCRM
    {
       
            public static string ToXML(Object oObject)
            {
                XmlDocument xmlDoc = new XmlDocument();
                XmlSerializer xmlSerializer = new XmlSerializer(oObject.GetType());
                using (MemoryStream xmlStream = new MemoryStream())
                {
                    xmlSerializer.Serialize(xmlStream, oObject);
                    xmlStream.Position = 0;
                    xmlDoc.Load(xmlStream);
                    return xmlDoc.InnerXml;
                }
            }

            public static T XMLToObject<T>(string XMLString) where T : class
            {
                XmlSerializer oXmlSerializer = new XmlSerializer(typeof(T));
                return (T)oXmlSerializer.Deserialize(new StringReader(XMLString));
            }

            public static T ProcessSQLOutputData<T>(DataRow row, TypeCode datatype, string fieldName)
            {
                try
                {
                    return row.Field<T>(fieldName);
                }
                catch (Exception)
            {
                    return default(T);
                }
            }        
    }
}