class AddKindToItem < ActiveRecord::Migration[5.1]
  def change
    add_column :items, :kind, :string
  end
end
