import layoutView from '../views/layout.art'
import headerCon from './header'
import asideCon from './aside'
class Layout {
  constructor() {
    this.render()
  }
  async render() {
    let html = layoutView()
    $('.root').html(html)
    //头 
    
    
    headerCon.render()
  
    //侧边
    asideCon.render()
    // location.reload()
  }
}
export default new Layout()