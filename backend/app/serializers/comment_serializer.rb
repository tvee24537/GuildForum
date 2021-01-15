class CommentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :notes, :idea_list_id
end
