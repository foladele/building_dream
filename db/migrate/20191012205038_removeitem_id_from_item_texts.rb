class RemoveitemIdFromItemTexts < ActiveRecord::Migration[5.1]
  def change
  	remove_column :item_texts, :item_id, :integer
  end
end
