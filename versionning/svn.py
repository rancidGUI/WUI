import re
import os
import subprocess
from rancid_conf.rancid_conf import get_value
from rancid_conf.rancid_conf import excecute_cmd
from reader_writer.reader import read_file

ROUTER_FILE_PREFIX = get_value(read_file("./conf.ini"),"ROUTER_DB_DIR")

def get_list_version(content):
    content_ro = content.replace("\n\n"," comment :")
    lines = content_ro.split('\n')
    regex = r"""^r(?P<Version>\d*).+comment :(?P<Comment>.+)$"""
    result = []
    for line in lines:
        match = re.match(regex, line)
        if match:
            result.append(match.groupdict())
    return result


def svn_cat(groups,machine,version):
    path = ROUTER_FILE_PREFIX+"/"+groups+"/configs/"+machine
    return exec_commande("svn cat -r"+version+" "+path).split('\n')

def svn_diff(groups,machine,diff):
    path = ROUTER_FILE_PREFIX+"/"+groups+"/configs/"+machine
    return exec_commande("svn diff -r"+diff+" "+path).split('\n')

def exec_commande(cmd):
    return os.popen(cmd).read()
