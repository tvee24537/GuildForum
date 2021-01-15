class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :idea_list

  validates :name, presence: true
end
