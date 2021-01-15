class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.string :name
      t.text :notes
      t.references :user, null: false, foreign_key: true
      t.references :idea_list, null: false, foreign_key: true

      t.timestamps
    end
  end
end
