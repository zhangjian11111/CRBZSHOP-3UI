export default {
  state: {
    // 对话来源[1:私聊;2:群聊]
    talk_type: 0,

    // 接收者ID
    receiver_id: 0,

    is_robot: 0,

    // 聊天记录
    records: [
      {
        id: "",
        createTime: "",
        toUser: "",
        isRead: false,
        messageType: "",
        talkId: "",
        text: "",
        float: "",
      },
    ],
    webSocketWithOut:false, // ws 是否是掉线 无输出状态
    // 对话索引（聊天对话的唯一索引）
    index_name: null,
  },
  mutations: {
     // 设置ws状态
     SET_WS_STATUS: (state,resource) =>{
      state.webSocketWithOut = resource
    },
    // 更新对话
    UPDATE_DIALOGUE_MESSAGE (state, resource) {
      state.records = [];
      state.talk_type = parseInt(resource.talk_type);
      state.receiver_id = parseInt(resource.receiver_id);
      state.is_robot = parseInt(resource.is_robot);

      /**
       * receiver_id 就是 好友id
       * 比如 a 和 b 聊天  receiver_id = b的id
       */
      state.index_name = (resource.talk_type || 1) + "_" + resource.receiver_id;
    },

    // 数组头部压入对话记录1494593861786271744 1494593778193793024
    UNSHIFT_DIALOGUE (state, records) {
      // console.log("%c 数组头部压入对话记录", "color:green");
      // console.log("state", state);
      // console.log("records", records);
      if (state.records.length > 0) {
        state.records.unshift(...records);
      } else {
        state.records.push(...records);
      }

      // console.log("最后的数据",state.records)
    },

    // 推送对话记录
    PUSH_DIALOGUE (state, record) {
      record = {...record,webSocketStatus:state.webSocketWithOut}
      console.log("推送对话",)
      state.records.push(record);
    },

    // 更新对话记录
    UPDATE_DIALOGUE (state, resource) {
      for (let i in state.records) {
        if (state.records[i].id === resource.id) {
          Object.assign(state.records[i], resource);
          break;
        }
      }
    },

    // 删除对话记录
    DELETE_DIALOGUE (state, index) {
      state.records.splice(index, 1);
    },

    BATCH_DELETE_DIALOGUE (state, ids) {
      ids.forEach((record_id) => {
        let index = state.records.findIndex((item) => item.id == record_id);
        if (index >= 0) state.records.splice(index, 1);
      });
    },

    // 数组头部压入对话记录
    SET_DIALOGUE (state, records) {
      state.records = records;
    },
  },
};
