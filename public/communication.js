/**
 * 用户相关业务
 */
;(function(name,factory){
    if(typeof module !== 'undefined' && module.exports) {
        module.exports=factory(/* deps */);
    } else if(typeof define==='function' && define.amd) {
        define([/* deps */],factory);
    } else {
        this[name]=factory(/* deps */);
    }
})('Hgobox',function(/* deps */){
    var Hgobox={};
    //设置
    var setting={};
    Hgobox.setting=setting;
    setting.debug=false;
    //操作函数
    Hgobox.assert=function (assertion,error) {
        if(undefined!==console && undefined!==console.assert) {
            console.assert(assertion,error);
        }
    }
    Hgobox.debug=function (message) {
        if(setting.debug) {
            if(undefined!==console && undefined!==console.debug) {
                console.debug(message);
            }
        }
    }
    //协议
    var CommunicationProtocol=function() {
    }
    Hgobox.CommunicationProtocol=CommunicationProtocol;
    CommunicationProtocol.VERSION_PROTOCOL='1.0.0';

    //协议字段
    CommunicationProtocol.KEY_VERSION='version';
    CommunicationProtocol.KEY_TYPE='type';
    CommunicationProtocol.KEY_DATA='data';
    CommunicationProtocol.KEY_CODE='code';
    CommunicationProtocol.KEY_ERROR='error';

    //业务类型
    CommunicationProtocol.BUSINESS_PING=1;
    CommunicationProtocol.BUSINESS_PONG=2;

    //用户业务类型
    CommunicationProtocol.BUSINESS_USER_LOGIN=100;
    CommunicationProtocol.BUSINESS_ACK_USER_LOGIN=101;
    CommunicationProtocol.BUSINESS_USER_LOGOUT=102;
    CommunicationProtocol.BUSINESS_ACK_USER_LOGOUT=103;
    CommunicationProtocol.BUSINESS_SEND_USER_OPEN_DOOR=104;
    CommunicationProtocol.BUSINESS_ACK_SEND_USER_OPEN_DOOR=105;
    CommunicationProtocol.BUSINESS_USER_OPEN_DOOR=106;
    CommunicationProtocol.BUSINESS_ACK_USER_OPEN_DOOR=107;
    CommunicationProtocol.BUSINESS_SEND_USER_OPEN_DOOR_MSG=108;
    CommunicationProtocol.BUSINESS_ACK_SEND_USER_OPEN_DOOR_MSG=109;
    CommunicationProtocol.BUSINESS_USER_OPEN_DOOR_MSG=110;
    CommunicationProtocol.BUSINESS_ACK_USER_OPEN_DOOR_MSG=111;
    CommunicationProtocol.BUSINESS_SEND_USER_CLOSE_DOOR=112;
    CommunicationProtocol.BUSINESS_ACK_SEND_USER_CLOSE_DOOR=113;
    CommunicationProtocol.BUSINESS_USER_CLOSE_DOOR_MSG=114;
    CommunicationProtocol.BUSINESS_ACK_USER_CLOSE_DOOR_MSG=115;
    CommunicationProtocol.BUSINESS_PAYMENT_MSG=116;
    CommunicationProtocol.BUSINESS_ACK_PAYMENT_MSG=117;
    CommunicationProtocol.BUSINESS_PUSH_USER_MSG=118;

    //管理人员业务类型
    CommunicationProtocol.BUSINESS_MANAGER_LOGIN=600;
    CommunicationProtocol.BUSINESS_ACK_MANAGER_LOGIN=601;
    CommunicationProtocol.BUSINESS_MANAGER_LOGOUT=602;
    CommunicationProtocol.BUSINESS_ACK_MANAGER_LOGOUT=603;
    CommunicationProtocol.BUSINESS_MANAGER_ORDER_RECEIVE_MSG=604;
    CommunicationProtocol.BUSINESS_ACK_MANAGER_ORDER_RECEIVE_MSG=605;
    CommunicationProtocol.BUSINESS_MANAGER_VERIFY_DISTRIBUTION_MSG=606;
    CommunicationProtocol.BUSINESS_ACK_MANAGER_VERIFY_DISTRIBUTION_MSG=607;

    CommunicationProtocol.makePayload=function (version,business,data) {
        Hgobox.assert(null!=version,"version can't be null");
        Hgobox.assert(null!=business,"business can't be null");
        var payload={version:version,type:business};
        if(null!=data) {
            payload['data']=data;
        }
        return payload;
    }

    CommunicationProtocol.makeAckPayload=function (version,business,code,dataOrError) {
        Hgobox.assert(null!=version,"version can't be null");
        Hgobox.assert(null!=business,"business can't be null");
        Hgobox.assert(null!=code,"code can't be null");
        var payload={version:version,type:business,code:code};
        if(null!=dataOrError) {
            if(code>=0) {
                payload['data']=dataOrError;
            } else {
                payload['error']=dataOrError;
            }
        }
        return payload;
    }

    CommunicationProtocol.makePing=function (data) {
        return CommunicationProtocol.makePayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_PING,data);
    }
    CommunicationProtocol.makePong=function(code,dataOrError) {
        return CommunicationProtocol.makeAckPayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_PONG,code,dataOrError);
    }

    CommunicationProtocol.makeUserLogin=function (data) {
        return CommunicationProtocol.makePayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_USER_LOGIN,data);
    }
    CommunicationProtocol.makeAckUserLogin=function (code,dataOrError) {
        return CommunicationProtocol.makeAckPayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_ACK_USER_LOGIN,code,dataOrError);
    }

    CommunicationProtocol.makeUserLogout=function (data) {
        return CommunicationProtocol.makePayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_USER_LOGOUT,data);
    }
    CommunicationProtocol.makeAckUserLogout=function (code,dataOrError) {
        return CommunicationProtocol.makeAckPayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_ACK_USER_LOGOUT,code,dataOrError);
    }

    CommunicationProtocol.makeSendUserOpenDoor=function (data) {
        return CommunicationProtocol.makePayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_SEND_USER_OPEN_DOOR,data);
    }
    CommunicationProtocol.makeAckSendUserOpenDoor=function (code,dataOrError) {
        return CommunicationProtocol.makeAckPayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_ACK_SEND_USER_OPEN_DOOR,code,dataOrError);
    }

    CommunicationProtocol.makeUserOpenDoor=function (data) {
        return CommunicationProtocol.makePayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_USER_OPEN_DOOR,data);
    }
    CommunicationProtocol.makeAckUserOpenDoor=function (code,dataOrError) {
        return CommunicationProtocol.makeAckPayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_ACK_USER_OPEN_DOOR,code,dataOrError);
    }

    CommunicationProtocol.makeSendUserOpenDoorMsg=function (data) {
        return CommunicationProtocol.makePayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_SEND_USER_OPEN_DOOR_MSG,data);
    }
    CommunicationProtocol.makeAckSendUserOpenDoorMsg=function (code,dataOrError) {
        return CommunicationProtocol.makeAckPayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_ACK_SEND_USER_OPEN_DOOR_MSG,code,dataOrError);
    }

    CommunicationProtocol.makeUserOpenDoorMsg=function (data) {
        return CommunicationProtocol.makePayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_USER_OPEN_DOOR_MSG,data);
    }
    CommunicationProtocol.makeAckUserOpenDoorMsg=function (code,dataOrError) {
        return CommunicationProtocol.makeAckPayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_ACK_USER_OPEN_DOOR_MSG,code,dataOrError);
    }

    CommunicationProtocol.makeSendUserCloseDoor=function (data) {
        return CommunicationProtocol.makePayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_SEND_USER_CLOSE_DOOR,data);
    }
    CommunicationProtocol.makeAckSendUserCloseDoor=function (code,dataOrError) {
        return CommunicationProtocol.makeAckPayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_ACK_SEND_USER_CLOSE_DOOR,code,dataOrError);
    }

    CommunicationProtocol.makeUserCloseDoorMsg=function (data) {
        return CommunicationProtocol.makePayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_USER_CLOSE_DOOR_MSG,data);
    }
    CommunicationProtocol.makeAckUserCloseDoorMsg=function (code,dataOrError) {
        return CommunicationProtocol.makeAckPayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_ACK_USER_CLOSE_DOOR_MSG,code,dataOrError);
    }

    CommunicationProtocol.makePaymentMsg=function (data) {
        return CommunicationProtocol.makePayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_PAYMENT_MSG,data);
    }
    CommunicationProtocol.makeAckPaymentMsg=function (code,dataOrError) {
        return CommunicationProtocol.makeAckPayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_ACK_PAYMENT_MSG,code,dataOrError);
    }

    CommunicationProtocol.makePushUserMsg=function (data) {
        return CommunicationProtocol.makePayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_PUSH_USER_MSG,data);
    }


    CommunicationProtocol.makeManagerLogin=function (data) {
        return CommunicationProtocol.makePayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_MANAGER_LOGIN,data);
    }
    CommunicationProtocol.makeAckManagerLogin=function (code,dataOrError) {
        return CommunicationProtocol.makeAckPayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_ACK_MANAGER_LOGIN,code,dataOrError);
    }

    CommunicationProtocol.makeManagerLogout=function (data) {
        return CommunicationProtocol.makePayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_MANAGER_LOGOUT,data);
    }
    CommunicationProtocol.makeAckManagerLogout=function (code,dataOrError) {
        return CommunicationProtocol.makeAckPayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_ACK_MANAGER_LOGOUT,code,dataOrError);
    }

    CommunicationProtocol.makeManagerOrderReceiveMsg=function (data) {
        return CommunicationProtocol.makePayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_MANAGER_ORDER_RECEIVE_MSG,data);
    }
    CommunicationProtocol.makeAckManagerOrderReceiveMsg=function (code,dataOrError) {
        return CommunicationProtocol.makeAckPayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_ACK_MANAGER_ORDER_RECEIVE_MSG,code,dataOrError);
    }

    CommunicationProtocol.makeManagerVerifyDistributionMsg=function (data) {
        return CommunicationProtocol.makePayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_MANAGER_VERIFY_DISTRIBUTION_MSG,data);
    }
    CommunicationProtocol.makeAckManagerVerifyDistributionMsg=function (code,dataOrError) {
        return CommunicationProtocol.makeAckPayload(CommunicationProtocol.VERSION_PROTOCOL,CommunicationProtocol.BUSINESS_ACK_MANAGER_VERIFY_DISTRIBUTION_MSG,code,dataOrError);
    }

    var CommunicationSocket=function () {
        var lastMessageTime=new Date().getTime();
        var isConnected=false;
        var heartbeatInterval=15000;
        var heartbeatId;
        var messageCallback;
        var connectCallback;
        var disconnectCallback;
        var queue=[];

        function connect(url) {
            try {
                return new WebSocket(url);
            } catch (exp) {
                Hgobox.debug(exp);
            }
            return null;
        }
        function disconnect(socket) {
            if(null!=socket) {
                try {
                    socket.close();
                } catch (exp) {
                    Hgobox.debug(exp);
                }
            }
            if(null!=heartbeatId) {
                clearTimeout(heartbeatId);
            }
        }
        function disconnected() {
            isConnected=false;
            if(null!=disconnectCallback) {
                try {
                    disconnectCallback();
                } catch (exp){
                    Hgobox.debug(exp);
                }
            }
        }
        function setSocketCallback(socket) {
            if(null!=socket) {
                socket.onopen=function (event/*Event*/) {
                    lastMessageTime=new Date().getTime();
                    isConnected=true;
                    try {
                        if(null!=connectCallback) {
                            connectCallback();
                        }
                    } catch (exp) {
                        Hgobox.debug(exp);
                    }
                    Hgobox.debug(event);

                    var payload;
                    while (null!=(payload=queue.shift())) {
                        try {
                            socket.send(JSON.stringify(payload));
                        } catch (exp) {
                            Hgobox.debug(exp);
                            break;
                        }
                    }
                }
                socket.onclose=function (event/*CloseEvent*/) {
                    disconnected();
                }
                socket.onerror=function (event/*Event*/) {
                    disconnected();
                    Hgobox.debug(event);
                }
                socket.onmessage=function (event/*MessageEvent*/) {
                    lastMessageTime=new Date().getTime();
                    isConnected=true;

                    try {
                        if(null!=messageCallback) {
                            messageCallback(JSON.parse(event.data));
                        }
                    } catch (exp) {
                        Hgobox.debug(exp);
                    }
                }
            }
        }

        function heartbeatWorker(socket,url) {
            if(new Date().getTime()-lastMessageTime>heartbeatInterval*2 || !isConnected) {
                disconnect(socket);
                socket=connect(url);
                setSocketCallback(socket);
            } else {
                try {
                    socket.send(JSON.stringify(Hgobox.CommunicationProtocol.makePing()));
                } catch (exp) {
                    disconnected()
                    Hgobox.debug(exp);
                }
            }

            heartbeatId=setTimeout(heartbeatWorker,heartbeatInterval,socket,url);
        }
        var socket;
        this.setInterval=function (interval) {
            if(null!=interval) {
                heartbeatInterval=interval;
            }
        }
        this.connect=function (url) {
            Hgobox.assert(null!=url,"url can't be null");

            socket=connect(url);
            setSocketCallback(socket);

            if(null!=heartbeatId) {
                clearTimeout(heartbeatId);
            }
            heartbeatId=setTimeout(heartbeatWorker,heartbeatInterval,socket,url);
        }
        this.disconnect=function () {
            disconnect(socket);
        }
        this.send=function (payload) {
            Hgobox.assert(null!=payload,"payload can't be null");

            if(isConnected) {
                try {
                    socket.send(JSON.stringify(payload));
                    return;
                } catch (exp) {
                    disconnected()
                    Hgobox.debug(exp);
                }
            }

            if(!isConnected) {
                socket=connect(url);
                setSocketCallback(socket);

                queue[queue.length]=payload;
            }
        }
        this.clear=function () {
            queue=[];
        }
        this.setMessageCallback=function (cb) {
            Hgobox.assert(null!=cb,"cb can't be null");

            messageCallback=cb;
        }
        this.setConnectCallback=function (cb) {
            Hgobox.assert(null!=cb,"cb can't be null");

            connectCallback=cb;
        }
        this.setDisconnectCallback=function (cb) {
            Hgobox.assert(null!=cb,"cb can't be null");

            disconnectCallback=cb;
        }
    }
    Hgobox.CommunicationSocket=CommunicationSocket;
    return Hgobox;
});