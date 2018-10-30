
const TagsAction = {
    state: {
        tagsList: [{
            title: '首页',
            path: '',
            name: 'main'
        }],
    },
    mutations: {
        getTagsList(state:any, get:any) {debugger
            let openedPage = state.tagsList[get.index];
            if (get.argu) {
                openedPage.argu = get.argu;
            }
            if (get.query) {
                openedPage.query = get.query;
            }
            state.tagsList.splice(get.index, 1, openedPage);
            localStorage.pageOpenedList = JSON.stringify(state.tagsList);
        },
    }
}

export default TagsAction