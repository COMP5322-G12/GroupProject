using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.Common
{
    [Serializable()]
    /// <summary>
    /// Summary description for ArrayReader
    /// </summary>
    public abstract class ArrayReader
    {
        #region Private Attribute
        private Object[] objects;
        #endregion

        #region Constructor
        public ArrayReader()
        {
            //
            // TODO: Add constructor logic here
            //
        }
        #endregion

        #region Method
        public bool Add(Object _object)
        {
            bool isAdded = false;

            try
            {
                ArrayList tempList;

                if (objects != null)
                {
                    tempList = new ArrayList(objects);
                }
                else
                {
                    tempList = new ArrayList();
                }

                tempList.Add(_object);
                objects = (Object[])tempList.ToArray(typeof(Object));
                isAdded = true;
            }
            catch
            {
            }

            return isAdded;
        }

        public bool Joins(ArrayReader arrayReader)
        {
            bool isJoined = false;

            try
            {
                if (objects != null)
                {
                    ArrayList tempList = new ArrayList(objects);

                    for (int i = 0; i < arrayReader.Objects.Length; i++)
                    {
                        tempList.Add(arrayReader.ElementAt(i));
                    }

                    objects = (Object[])tempList.ToArray(typeof(Object));
                    isJoined = true;
                }
            }
            catch
            {
            }

            return isJoined;
        }

        private bool IsOutOfRange(int index)
        {
            bool isOutOfRange = false;

            try
            {
                if (index < 0 || index >= NumberOfRecord)
                {
                    isOutOfRange = true;
                }
            }
            catch
            {
            }

            return isOutOfRange;
        }

        public Object ElementAt(int index)
        {
            Object tempObject = null;

            try
            {
                if (!IsOutOfRange(index))
                {
                    tempObject = objects[index];
                }
            }
            catch
            {
            }

            return tempObject;
        }

        public bool RemoveAt(int index)
        {
            bool isRemoved = false;

            try
            {
                if (objects != null)
                {
                    if (!IsOutOfRange(index))
                    {
                        ArrayList tempList = new ArrayList(objects);
                        tempList.RemoveAt(index);
                        objects = (Object[])tempList.ToArray(typeof(Object));
                        isRemoved = true;
                    }
                }
            }
            catch
            {
            }

            return isRemoved;
        }

        public bool Insert(int index, Object _object)
        {
            bool isInserted = false;

            try
            {
                if (objects != null)
                {
                    if (!IsOutOfRange(index))
                    {
                        ArrayList tempList = new ArrayList(objects);
                        tempList.Insert(index, _object);
                        objects = (Object[])tempList.ToArray(typeof(Object));
                        isInserted = true;
                    }
                }
            }
            catch
            {
            }

            return isInserted;
        }

        public bool Update(int index, Object _object)
        {
            bool isUpdated = false;

            try
            {
                if (objects != null)
                {
                    if (!IsOutOfRange(index))
                    {
                        ArrayList tempList = new ArrayList(objects);
                        tempList[index] = _object;
                        objects = (Object[])tempList.ToArray(typeof(Object));
                        isUpdated = true;
                    }
                }
            }
            catch
            {
            }

            return isUpdated;
        }

        public bool Contains(Object _object)
        {
            bool contains = false;

            try
            {
                if (objects != null)
                {
                    for (int i = 0; i < objects.Length; i++)
                    {
                        if (objects[i] == _object)
                        {
                            contains = true;
                        }
                    }
                }
            }
            catch
            {
            }

            return contains;
        }

        public override string ToString()
        {
            string _string = "";

            try
            {
                _string += "Number of Records = " + this.NumberOfRecord + "<br>";

                for (int i = 0; i < objects.Length; i++)
                {
                    _string += objects[i].ToString();
                }
            }
            catch
            {
            }

            return _string;
        }
        #endregion

        #region Get/Set Method
        public int NumberOfRecord
        {
            get
            {
                if (this.objects != null)
                {
                    return this.objects.Length;
                }
                else
                {
                    return 0;
                }
            }
        }

        public Object[] Objects
        {
            get
            {
                return this.objects;
            }
            set
            {
                this.objects = value;
            }
        }
        #endregion
    }
}