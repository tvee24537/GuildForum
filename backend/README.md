# README

/*
t.string :name 
t.references :user
*/
Idea
  belongs_to :user
  has_many :comment

/*
t.string :name 
t.text :notes
t.boolean :complete 
t.references :user
t.references :idea
*/
Comment
  belongs_to :user
  belongs_to :idea
```