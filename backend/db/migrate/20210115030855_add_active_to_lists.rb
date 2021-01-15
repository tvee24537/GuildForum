class AddActiveToList < ActiveRecord::Migration[6.0]
    def change
        add_column :idea_lists, :active, :boolean
    end
end