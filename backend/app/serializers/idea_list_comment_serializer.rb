class IdeaListCommentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :active
  has_many :comments
end
