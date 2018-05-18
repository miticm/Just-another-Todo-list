const app = {
    init(selectors) {
      this.flicks = []
      this.max = 0
      this.list = document.querySelector(selectors.listSelector)
      this.template = document.querySelector(selectors.templateSelector)
  
      document
        .querySelector(selectors.formSelector)
        .addEventListener('submit', ev => {
          ev.preventDefault()
          this.handleSubmit(ev)
        })
    },
  
    renderListItem(flick) {
      const item = this.template.cloneNode(true)
      item.classList.remove('template')
      item.dataset.id = flick.id
      item
        .querySelector('.flickName')
        .textContent = flick.name

      item.querySelector("#deleteBtn").addEventListener('click',()=>{
        item.parentNode.removeChild(item)
      })

      item.querySelector('#editBtn').addEventListener('click',()=>{
        const textSpan = item.querySelector('.flickName')
        textSpan.contentEditable = 'true'
        textSpan.focus()
      })

      item.querySelector('#favBtn').addEventListener('click',()=>{
        flick.fav = !flick.fav
        flick.fav 
          ? item.querySelector('.fa-star').style.color = '#CD0000' 
          : item.querySelector('.fa-star').style.color = 'white'
      })

      item.querySelector('#upBtn').addEventListener('click',()=>{
        item.parentNode.removeChild(item)
        this.list.insertBefore(item, this.list.firstChild)
        this.buttonDisabled()
      })
      
      item.querySelector('#downBtn').addEventListener('click',()=>{
        item.parentNode.removeChild(item)
        this.list.appendChild(item)
        this.buttonDisabled()
      })
  
      return item
    },
  
    handleSubmit(ev) {
      const f = ev.target
      const flick = {
        id: ++this.max,
        name: f.flickName.value,
        fav: false,
      }
      this.flicks.unshift(flick)
      const item = this.renderListItem(flick)
      this.list.insertBefore(item, this.list.firstChild)
      this.buttonDisabled()
      f.reset()
    },
    buttonDisabled(){
      this.list.childNodes.forEach(element => {
        element.querySelector('#upBtn').disabled = false
        element.querySelector('#downBtn').disabled = false
      });
      this.list.firstChild.querySelector('#upBtn').disabled = true;
      this.list.lastChild.querySelector('#downBtn').disabled = true;
    }
  }

  
  app.init({
    formSelector: '#flickForm',
    listSelector: '#flickList',
    templateSelector: '.flick.template',
  })