class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :email, :create_at
end
