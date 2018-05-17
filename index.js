const app = {
    init(selector) {
        this.flicks = []
        this.max = 0
        this.list = document.querySelector(selector.listSelector)

        document.querySelector(selector.formSelector).addEventListener('submit', ev => {
            ev.preventDefault()
            this.handleSubmit(ev)
        })
    },
    
    renderListItem(flick){
        const item = document.createElement('li')
        item.dataset.id = flick.id
        item.textContent = flick.name
        return item
    },

    handleSubmit(ev) {
        const f = ev.target
        const flick = {
            id: ++this.max, //this bind to the event target if not using arrow function
            name: f.flickName.value,
        }

        this.flicks.unshift(flick)
        
        const item = this.renderListItem(flick)
        this.list.insertBefore(item,this.list.firstChild)
        f.reset()
    },
}

app.init({
    formSelector: '#flickForm',
    listSelector: '#flickList',
})