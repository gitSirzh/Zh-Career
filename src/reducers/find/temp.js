/**
 * Created by jszh on 2018/12/28.
 */

const custom = (state = 999, action = {}) => {
    switch (action.type) {
        case '+':
            return state + 1;
        case '-':
            return state + 2;
        default:
            return state
    }
};

export default custom
