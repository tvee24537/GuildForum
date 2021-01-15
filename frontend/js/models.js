class IdeaList {
    constructor(attributes) {
      let whitelist = ["id", "name", "active"]
      whitelist.forEach(attr => this[attr] = attributes[attr]) /*pull attr from new object that used for new idea*/
    }
    /*
    IdeaList.container() returns a reference to this DOM node:
    <section id="ideaListsContainer" class="px-4 bg-blue-100 min-h-screen rounded-md shadow">
      <h1 class="text-2xl semibold border-b-4 border-blue">Todo Lists</h1>
      <ul id="lists" class="list-none">
  
      </ul>
    </section>
    */
    static container() {
      return this.c ||= document.querySelector("#ideaListsContainer") //'this' is calling the class itself
    }
    /*
    IdeaList.list() returns a reference to this DOM node:
    <ul id="lists" class="list-none">
  
    </ul>
    */
    static list() {
      return this.l ||= document.querySelector('#lists') //'this' is calling the class itself
    }
    
    // IdeaList.all() will return all of the idea objects that we get from fetching to /idea_lists.
    static all() {
        return fetch("http://localhost:3000/idea_lists", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if(res.ok) {
                    return res.json() // return a promise of body content parsed as JSON
                } else {
                    return res.text().then(error => Promise.reject(error)) // return a reject promise so we skip the then and go to catch
                }
            })
            .then(ideaListArray => {
                this.collection = ideaListArray.map(attrs => new IdeaList(attrs))
                let renderedLists = this.collection.map(ideaList => ideaList.render())
                this.container().append(...renderedLists);
                return this.collection
            })
    }
    /*
    TodoList.findById(id) will return the TodoList object that matches the id passed as an argument.
    We'll assume here that this.collection exists because we won't be calling this method until the DOM 
    we've clicked on an element created by one of our TodoList instances that we created and stored in 
    this.collection when the initial fetch has completed and promise callbacks have been executed.
    We're using == instead of === here so we can take advantage of type coercion 
    (the dataset property on the target element will be a string, whereas the id of the TodoList will be an integer)
    */
    static findById(id) {
        return this.collection.find(ideaList => ideaList.id == id)
    }

    static create(formData) {
        return fetch("http://localhost:3000/idea_lists", {
            method: 'POST', //default is get
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({idea_list: formData}) // make object a string
        })
        .then(res => {
            if(res.ok) {
                return res.json() // return a promise of body content parsed as JSON
            } else {
                return res.text().then(error => Promise.reject(error)) // return a reject promise so we skip the then and go to catch
            }
        })
        .then(ideaListAttributes => {
            let ideaList = new IdeaList(ideaListAttributes);
            this.collection.push(ideaList);
            this.container().appendChild(ideaList.render()) // appendchild only append one node and only node objects
            new FlashMessage({type: 'success', message: 'New Idea added successfully' })
            return ideaList;
        })
        .catch(error => {
            new FlashMessage({type: 'error', message: error});
        })
    }
    /*
    ideaList.show() => {
        fetch idea_list:id route to get idealist and its associated comments
        use respond to create comment instances client side by invoking Comment.loadByList(id, commentsAttributes)
        take previous selected active ideaList and mark active: false
        mark shown ideaList as active: true so it's shown in darker bg
    }
    */
    show() {
        return fetch(`http://localhost:3000/idea_lists/${this.id}`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if(res.ok) {
                return res.json() // return a promise of body content parsed as JSON
            } else {
                return res.text().then(error => Promise.reject(error)) // return a reject promise so we skip the then and go to catch
            }
        })
        .then(data => {
            
        })
    }
    /*
    ideaList.render() will create li element and assign it to this.element which will fill element with content like below:
    <li class="my-2 px-4 bg-green-200 grid grid-cols-12 sm:grid-cols-6">
          <a href="#" class="py-4 col-span-10 sm:col-span-4">My List</a>
          <a href="#" class="my-4 text-right"><i class="fa fa-pencil-alt"></i></a>
          <a href="#" class="my-4 text-right"><i class="fa fa-trash-alt"></i></a>
    </li>
    */
    render() {
        this.element ||= document.createElement('li');
        this.element.classList.add(..."my-2 px-4 bg-green-200 grid grid-cols-12 sm:grid-cols-6".split(" "));
        
        this.nameLink ||= document.createElement('a');
        this.nameLink.classList.add(..."py-4 col-span-10 sm:col-span-4 selectIdeaList".split(""));
        this.nameLink.textContent = this.name
        this.nameLink.dataset.ideaListId = this.id;

        this.editLink ||= document.createElement('a');
        this.editLink.classList.add(..."my-4 text-right".split(" "));
        this.editLink.innerHTML = '<i class="fa fa-trash-alt"></i>';

        this.deleteLink ||= document.createElement('a');
        this.deleteLink.classList.add(..."my-4 text-right".split(" "));
        this.deleteLink.innerHTML = '<i class="fa fa-trash-alt"></i>';

        this.element.append(this.nameLink, this.editLink, this.deleteLink);

        return this.element;
    }
  }
  
  class Comment {
    constructor(attributes) {
      let whitelist = ["id", "name", "idea_list_id"]
      whitelist.forEach(attr => this[attr] = attributes[attr])
    }
  
    static container() {
      return this.c ||= document.querySelector("#comments")
    }
  }

 class FlashMessage { // flash message red if error, blue if not
    constructor({type, message}) {
        this.message = message;
        this.color = type == "error" ? 'bg-red-200' :'bg-blue-100';
        this.render();
    }

    static container() {
        return this.c ||= document.querySelector('#flash')
    }

    render() { // put message in display
        this.toggleMessage();
        window.setTimeout(() => this.toggleMessage(), 5000);

    }
    toggleMessage() {
        console.log(this);
        FlashMessage.container().textContent = this.message;
        FlashMessage.container().classList.toggle(this.color);
        FlashMessage.container().classList.toggle('opacity-0');
    }
}