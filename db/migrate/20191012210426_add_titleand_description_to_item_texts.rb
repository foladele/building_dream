class AddTitleandDescriptionToItemTexts < ActiveRecord::Migration[5.1]
  def change
    add_column :item_texts, :title, :string
    add_column :item_texts, :description, :string
    add_column :item_texts, :kind, :string
  end
end
