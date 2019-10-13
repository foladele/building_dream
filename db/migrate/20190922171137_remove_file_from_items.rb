class RemoveFileFromItems < ActiveRecord::Migration[5.1]
  def change
  	remove_attachment :items, :file
  end
end
