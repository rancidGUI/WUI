from reader_writer.reader import read_file
from reader_writer.writer import write_file
import re
import os
import datetime,glob

def get_log(f):
    regex = r"""^(.*) (error:) (.*)$"""
    regex2 = r"""^.*/(.*)\.([0-9]+)\.([0-9]+)$"""
    name = re.search(regex2,f).group(1)
    time = re.search(regex2,f).group(2) + re.search(regex2,f).group(3)
    matchedlines={}
    matchedlines['error'] = ""
    matchedlines['group'] = ""
    matchedlines['time'] = ""            
    with open(f) as fp: lines = fp.read().splitlines()
    for line in lines:
        key_val = re.match(regex,line)
        if key_val:
            matchedlines['error'] += line+"\n"
    if (len(matchedlines['error'].split('\n')) > 0):
        matchedlines['group'] = name
        matchedlines['time'] = s_datetime = datetime.datetime.strptime(time, '%Y%m%d%H%M%S')
    return matchedlines

def delete_log(time ,ROUTER_FILE_PREFIX):
    nbDayKeepInLog = time
    slogPathName = ROUTER_FILE_PREFIX + "logs/"
    if (nbDayKeepInLog > 0):
        dtErase=datetime.date.today() - datetime.timedelta(days=nbDayKeepInLog)
        LstFileLog = glob.glob(slogPathName)
        print(len(LstFileLog))
        if len(LstFileLog) > 0 :
            for sFileLog in LstFileLog:
                StatDate = os.stat(sFileLog)
                lastmodDate = time.localtime(StatDate[8])
                if  lastmodDate < dtErase :
                    os.remove(sFileLog)
                    
