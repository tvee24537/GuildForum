# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user = User.first 

study_tasks = user.ideas.find_or_create_by(name: "Study Tasks")

task_1 = user.comments.find_or_create_by(name: "learn about promises", idea_id: study_tasks.id)