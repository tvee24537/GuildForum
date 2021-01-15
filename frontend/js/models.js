class Idea {
    constructor(attributes) {
      let whitelist = ["id", "name", "active"]
      whitelist.forEach(attr => this[attr] = attributes[attr])
    }
    /*
    Idea.container() returns a reference to this DOM node:
    <section id="ideasContainer" class="px-4 bg-blue-100 min-h-screen rounded-md shadow">
      <h1 class="text-2xl semibold border-b-4 border-blue">Todo Lists</h1>
      <ul id="lists" class="list-none">
  
      </ul>
    </section>
    */
    static container() {
      return this.c ||= document.querySelector("#ideasContainer")
    }
    /*
    Idea.list() returns a reference to this DOM node:
    <ul id="lists" class="list-none">
  
    </ul>
    */
    static list() {
      return this.l ||= document.querySelector('#lists')
    }
  
    /*
    <div
    */
    render() {
  
    }
  }
  
  class Comment {
    constructor(attributes) {
      let whitelist = ["id", "name", "todo_list_id", "complete", "due_by"]
      whitelist.forEach(attr => this[attr] = attributes[attr])
    }
  
    static container() {
      return this.c ||= document.querySelector("#comments")
    }
  }