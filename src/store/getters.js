const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  role: state => state.user.role,
  pageId: state => state.page.pageId,
  menu: state => state.page.menu,
  count: state => state.page.count,
  score: state => state.page.score,
  changeTopic: state => state.page.changeTopic,
  changeTab: state => state.page.changeTab,
  paper: state => state.page.paper
}
export default getters
