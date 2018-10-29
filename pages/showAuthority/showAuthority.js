// pages/showAuthority/showAuthority.js
let showLogin = {
  show:function() {
    var that = this;
    this.setData({
      '_toast_.isShow':true,
    })
  }
}

function showLogin(){
  let pages = getCurrentPages();
  let curPage = pages[pages.length - 1];
  Object.assign(curPage, showLogin)
  curPage.showLogin = this;
  curPage.setData({
    '_toast_.isShow': false,
  })

  return this;
}

module.exorts = {
  showLogin
}
