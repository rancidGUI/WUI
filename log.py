from rancid_conf import rancid_conf
from flask import jsonify, request
from flask.views import MethodView
from reader_writer.reader import read_file
from reader_writer.writer import write_file
from router_db.router_db import count_device
from wui_log.logs import get_log
from wui_log.logs import delete_log
import pprint
import os

ROUTER_FILE_PREFIX = rancid_conf.get_value(read_file("./conf.ini"),"ROUTER_DB_DIR")
class Log(MethodView):

    def get(self):
        try:
            error = []
            mtime = lambda f: os.stat(os.path.join(ROUTER_FILE_PREFIX + "logs/", f)).st_mtime
            log = list(sorted(os.listdir(ROUTER_FILE_PREFIX + "logs/"), key=mtime))
            for i in reversed(log):
                test = get_log(ROUTER_FILE_PREFIX + "logs/" + i)
                if test['error'] != "":
                    error.append(test)
            if (len(error) == 0):
                error = "No Error"
            return jsonify(log=error), 200
        except IOError as e:
            return jsonify(message=str(e)), 500

    def delete(self, param):
        try:
            delete_log(param, ROUTER_FILE_PREFIX)
            return jsonify(log="logs deleted"), 200
        except IOError as e:
            return jsonify(message=str(e)), 500
