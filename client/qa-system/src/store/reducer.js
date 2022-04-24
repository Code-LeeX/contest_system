 
export default (state = 0, action) => {
    if(action.type === 'change_stu_id'){
        let storage = window.localStorage;
        storage.setItem('STU_id', action.value)
        return action.value;
    }
    return state;
}