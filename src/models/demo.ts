import { queryDemo } from '../services/demo';

export default {
    namespace: 'demo',
    state: {
        list: []
    },

    effects: {
        * initData(params, {put}) {
            // const url = "/test/demo";
            // let data = yield call(request, url);
            let data = yield queryDemo();
            yield put({
                type: "queryList",
                data: data
            });
        }
    },

    reducers: {
        queryList(state, result) {
            let data = [...result.data];
            return {
                list: data
            };
        }
    }
};
