class IdeaListCommentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :active
end
