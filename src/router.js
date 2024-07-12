export class Router {

    routes = {}

    add(routeName, page) {
        this.routes[routeName] = page
    }

    route(event) {
        event = event || window.event        
        event.preventDefault()
        window.history.pushState({}, "", event.target.href)
        this.handle()
    } 
    
    async handle() {
        const { pathname } = window.location
        const route = this.routes[pathname] || this.routes[404]
    
        try {
            const response = await fetch(route)
            const data = await response.text()
            document.querySelector('#app').innerHTML = data
        } catch (error) {
            console.error(error)
        }
    
    }

}
