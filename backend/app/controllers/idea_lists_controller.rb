class IdeaListsController < ApplicationController
  before_action :set_idea_list, only: [:show, :update, :destroy]

  # GET /idea_lists
  def index
    @idea_lists = current_user.idea_lists

    render json: IdeaListSerializer.new(@idea_lists).serializable_hash[:data].map{|il| il[attributes]}
  end

  # GET /idea_lists/1
  def show
    render json: @idea_list
  end

  # POST /idea_lists
  def create
    @idea_list = IdeaList.new(idea_list_params)

    if @idea_list.save
      render json: @idea_list, status: :created, location: @idea_list
    else
      render json: @idea_list.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /idea_lists/1
  def update
    if @idea_list.update(idea_list_params)
      render json: @idea_list
    else
      render json: @idea_list.errors, status: :unprocessable_entity
    end
  end

  # DELETE /idea_lists/1
  def destroy
    @idea_list.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_idea_list
      @idea_list = IdeaList.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def idea_list_params
      params.require(:idea_list).permit(:name, :user_id)
    end
end
