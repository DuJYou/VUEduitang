import asideView from '../views/aside.art'
// import usersCon from './users'
class Aside {
    constructor() {
    }
    render() {
        let asideHtml = asideView()
        $('aside').html(asideHtml)
    }
}
export default new Aside()