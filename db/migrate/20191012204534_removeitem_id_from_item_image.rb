class RemoveitemIdFromItemImage < ActiveRecord::Migration[5.1]
  def change
  	remove_column :item_images, :item_id, :integer
  end
end
