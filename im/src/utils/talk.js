import store from "@/store";
import router from "@/router";
import { parseTime } from "@/utils/functions";
import { ServeCreateTalkList } from "@/api/chat";

const KEY_INDEX_NAME = "send_message_index_name";

/**
 * 通过对话索引查找对话列表下标
 *
 * @param {String} index_name
 */
export function findTalkIndex (index_name) {
  return store.state.talks.items.findIndex(
    (item) => item.index_name == index_name
  );
}

/**
 * 通过对话索引查找对话列表
 *
 * @param {String} index_name
 */
export function findTalk (index_name) {
  return store.state.talks.items.find((item) => item.index_name == index_name);
}

/**
 * 格式化聊天对话列表数据
 *
 * @param {Object} params
 */
export function formatTalkItem (params) {
  let options = {
    id: "",
    disable: false,
    face: "",
    lastTalkTime: "",
    name: "",
    top: false,
    unread: 0, //未读消息
    is_online: 0, //是否在线
    draft_text: "", //草稿
    msg_text: "", //存储的消息
    userId: "",
  };

  Object.assign(options, params);
  options.index_name = `${options.talk_type}_${options.receiver_id}`;

  return options;
}

/**
 * 打开指定对话窗口
 *
 * @param {Integer} talk_type 对话类型[1:私聊;2:群聊;]
 * @param {Integer} receiver_id 接收者ID
 */
export function toTalk (talk_type, receiver_id) {
  ServeCreateTalkList(receiver_id).then(({ code, data }) => {
    console.log("ServeCreateTalkList", data);
    if (code == 200) {
      sessionStorage.setItem(KEY_INDEX_NAME, `${talk_type}_${receiver_id}`);
      router.push({
        path: "/message",
        query: {
          v: new Date().getTime(),
        },
      });
    }
  });
}

/**
 * 获取需要打开的对话索引值
 *
 * @returns
 */
export function getCacheIndexName () {
  let index_name = sessionStorage.getItem(KEY_INDEX_NAME);
  if (index_name) {
    sessionStorage.removeItem(KEY_INDEX_NAME);
  }

  return index_name;
}
