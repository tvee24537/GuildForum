class IdeaList < ApplicationRecord
  belongs_to :user
  has_many :comments

  validates :name, presence: true
end
