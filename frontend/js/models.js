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
                console.log(this); // store objects
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
        this.element.class = "my-2 px-4 bg-green-200 grid grid-cols-12 sm:grid-cols-6"
        
        this.nameLink ||= document.createElement('a');
        this.nameLink.class = "py-4 col-span-10 sm:col-span-4";
        this.nameLink.textContent = this.name

        this.editLink ||= document.createElement('a');
        this.editLink.class = "my-4 text-right";
        this.editLink.innerHTML = '<i class="fa fa-trash-alt"></i>';

        this.deleteLink ||= document.createElement('a');
        this.deleteLink.class = "my-4 text-right";
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