import redis
import json

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

def save_chat_history(user_input, response):
    r.rpush("chat_history", json.dumps({"user": user_input, "bot": response}))

def get_chat_history():
    return [json.loads(x) for x in r.lrange("chat_history", 0, -1)]