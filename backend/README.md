# README

/*
t.string :name 
t.references :user
*/
Post
  belongs_to :user
  has_many :comment

/*
t.string :name 
t.text :notes
t.boolean :complete 
t.references :user
t.references :post
*/
Comment
  belongs_to :user
  belongs_to :post
```