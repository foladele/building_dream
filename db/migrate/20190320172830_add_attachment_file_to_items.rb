class AddAttachmentFileToItems < ActiveRecord::Migration[5.1]
  def self.up
    change_table :items do |t|
      t.attachment :file
    end
  end

  def self.down
    remove_attachment :items, :file
  end
end
