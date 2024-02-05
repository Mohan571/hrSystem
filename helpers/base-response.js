module.exports = {
    response(status,data,message) {
        return ({'status':status,'data':data,'message':message});
    }
};