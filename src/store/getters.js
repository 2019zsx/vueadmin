const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  SET_TOKENrefresh: state => state.user.SET_TOKENrefresh,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  uid:state=> state.user.uid,
  routedata:state=>state.user.routedata
}
export default getters
